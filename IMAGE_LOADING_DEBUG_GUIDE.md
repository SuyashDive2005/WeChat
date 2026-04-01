# Image Loading Debug Guide

## 📋 Configuration Check

✅ **Verified Configuration:**

- Cloudinary credentials in `.env` - **PRESENT** ✓
  - `CLOUDINARY_CLOUD_NAME`: dg3uzowe9
  - `CLOUDINARY_API_KEY`: 692448335376884
  - `CLOUDINARY_API_SECRET`: IybFYOQX0voFWW0YAVXv4kFuK30

- Backend Headers:
  - COOP: `same-origin-allow-popups` (for Google Sign-In) ✓
  - COEP: **NOT set in development** (allows Cloudinary images) ✓
  - CORS: Properly configured with credentials ✓

- Frontend Configuration:
  - Axios with credentials enabled ✓
  - Image tags with proper fallbacks ✓

---

## 🔍 Debugging Steps

### Step 1: Check Backend Logs

**Start the backend and watch the console:**

```bash
cd Backend
npm run dev
```

**Look for these logs when you try to upload a profile picture:**

✅ **Success logs:**

```
📸 Update Profile Request - UserId: [user-id]
📸 Received profilePic: data:image/...
🚀 Uploading to Cloudinary...
✅ Cloudinary Upload Success: https://res.cloudinary.com/...
✅ Database Updated: https://res.cloudinary.com/...
```

❌ **Error logs:**

```
❌ Cloudinary Upload Error: { message: "...", status: ... }
❌ Error in Update Profile: ...
```

### Step 2: Check Frontend Logs

**Open Chrome DevTools → Console (F12)**

**When loading the app:**

1. You should see logs like:

```
📋 Users fetched: X users
  User 1: John Doe - ProfilePic: ✓
    URL: https://res.cloudinary.com/...
```

**When clicking a user in sidebar:**

```
✅ Chat Avatar Loaded: https://res.cloudinary.com/...
```

**If images fail to load:**

```
❌ Chat Avatar Load Error - Current src: https://res.cloudinary.com/...
📊 Selected User profilePic: https://res.cloudinary.com/...
```

### Step 3: Test Image Upload

1. **Go to Profile Page** (click profile icon)
2. **Click Camera Icon** to upload profile picture
3. **Select an image** from your computer

**In browser console, you should see:**

```
📤 Sending profile update request with: data:image/jpeg;base64,...
✅ Profile update response received: { ... profilePic: "https://res.cloudinary.com/..." }
📸 New profilePic URL: https://res.cloudinary.com/...
```

4. **If successful**, the image preview should change, and you should see:

```
✅ Image Loaded Successfully: data:image/jpeg;base64,...
```

5. **If failed**, you should see:

```
❌ Image Load Error - Current src: https://res.cloudinary.com/...
📊 Auth User profilePic: https://res.cloudinary.com/...
```

---

## 🔧 Troubleshooting

### Issue 1: "❌ Cloudinary Upload Error"

**Possible Causes:**

- Cloudinary API credentials invalid
- Base64 image is corrupted
- Base64 is too large (>50MB)

**Fix:**

1. Verify credentials in Backend/.env match Cloudinary dashboard
2. Try with a smaller image (<5MB)
3. Check Backend/src/index.js has `express.json({ limit: "50mb" })`

---

### Issue 2: "✗ MISSING" profilePic in Users List

**Possible Causes:**

- Users never uploaded a profile picture
- Database fields are empty
- Query not including profilePic field

**Fix:**

1. Check backend logs for "ProfilePic: ✗"
2. Test uploading a profile picture to see if it gets stored
3. Run in database: `SELECT id, fullName, profile_pic FROM users;`

---

### Issue 3: "❌ Image Load Error" in Browser

**Possible Causes:**

- Cloudinary URL is invalid or malformed
- Cloudinary account is suspended
- CORS/COEP headers blocking Cloudinary domain

**Fix:**

1. **Test URL directly in browser:**
   - Copy the URL from console: `https://res.cloudinary.com/dg3uzowe9/...`
   - Open it in new tab
   - Should display the image

2. **If URL doesn't work:**
   - Check if Cloudinary upload actually succeeded (backend logs)
   - Log into Cloudinary dashboard to verify account is active
   - Check if image was uploaded to Cloudinary

3. **Check Network Tab in DevTools:**
   - Open DevTools → Network tab
   - Reload page
   - Look for requests to `res.cloudinary.com`
   - Check response status (should be 200, not 403/404)
   - Check CORS headers in response

---

## 📊 Database Check

**Connect to MySQL and verify:**

```sql
-- Check if profilePic is stored
SELECT id, full_name, profile_pic FROM users;

-- Check if profile_pic column exists
DESCRIBE users;
```

**Expected output:**

```
id | full_name    | profile_pic
---+------------- +-------------------------------------------------
1  | John Doe    | https://res.cloudinary.com/dg3uzowe9/image/...
2  | Jane Smith  | (null)  ← User hasn't uploaded yet
```

---

## ✅ Verification Checklist

- [ ] Backend `.env` has valid Cloudinary credentials
- [ ] Backend started with `npm run dev` (not `node index.js`)
- [ ] Frontend running on `http://localhost:5173`
- [ ] Recently uploaded image shows backend logs (✅ Cloudinary...)
- [ ] Browser console shows fetchedusers with profilePic
- [ ] Image URL works when tested directly in browser
- [ ] No CORS/COEP errors in browser console
- [ ] Avatar.png fallback image loads when profilePic is null

---

## 🚀 Quick Test Commands

**Test Cloudinary Credentials:**

```bash
cd Backend
node -e "
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dg3uzowe9',
  api_key: '692448335376884',
  api_secret: 'IybFYOQX0voFWW0YAVXv4kFuK30'
});
cloudinary.api.resources((err, res) => {
  if(err) console.log('❌ Error:', err.message);
  else console.log('✅ Cloudinary working! Resources:', res.resources.length);
});
"
```

---

## 📞 Still Not Working?

1. **Restart Backend:**

```bash
cd Backend
npm run dev
```

2. **Clear Browser Cache:**

- DevTools → Network tab → "Disable cache"
- Or Hard refresh: Ctrl+Shift+R

3. **Check Logs Carefully:**

- Share screenshots of backend console logs
- Share screenshots of browser console logs
- Note which step fails (upload vs retrieval)

4. **Test with Known Working Image:**

- Try uploading the Wechat logo or a standard profile pic
- Check if it works with all users or just specific ones
