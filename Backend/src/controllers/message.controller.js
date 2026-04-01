import { prisma } from "../lib/prisma.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await prisma.user.findMany({
      where: {
        id: { not: loggedInUserId },
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        profilePic: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const usersWithMongoShape = filteredUsers.map((user) => ({
      ...user,
      _id: user.id,
    }));

    res.status(200).json(usersWithMongoShape);
  } catch (error) {
    console.log("Error in getUserForSodebar :", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      },
      orderBy: { createdAt: "asc" },
    });

    const messagesWithMongoShape = messages.map((message) => ({
      ...message,
      _id: message.id,
    }));

    res.status(200).json(messagesWithMongoShape);
  } catch (error) {
    console.log("Error in getMessages controller :", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId: senderId,
        receiverId: receiverId,
        text: text,
        image: imageUrl,
      },
    });
    const messageWithMongoShape = {
      ...newMessage,
      _id: newMessage.id,
    };

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", messageWithMongoShape);
    }

    res.status(200).json(messageWithMongoShape);
  } catch (error) {
    console.log("error in sendMessage controller :", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
