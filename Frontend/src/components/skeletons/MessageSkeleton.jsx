export default function MessageSkeleton() {
  const skeletonMessages = Array(6).fill(null);

  // Function to generate random width
  const getRandomWidth = () => {
    const minWidth = 150; // minimum width in pixels
    const maxWidth = 300; // maximum width in pixels
    return Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
  };

  return (
    <div
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white via-primary-50 to-primary-100/10"
      style={{ scrollbarWidth: "none" }}
    >
      {skeletonMessages.map((_, idx) => {
        const isEnd = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`flex ${isEnd ? "justify-end" : "justify-start"}`}
          >
            {!isEnd && (
              <div className="mr-2">
                <div className="size-8 rounded-full bg-gradient-to-br from-primary-200 to-primary-100 animate-pulse" />
              </div>
            )}
            <div
              className={`flex flex-col ${isEnd ? "items-end" : "items-start"}`}
            >
              <div className="h-3 w-12 mb-2 bg-gradient-to-r from-primary-200 to-transparent rounded animate-pulse" />
              <div
                className={`h-12 rounded-2xl animate-pulse ${isEnd ? "bg-primary-200" : "bg-primary-100"}`}
                style={{ width: `${getRandomWidth()}px` }}
              />
            </div>
            {isEnd && (
              <div className="ml-2">
                <div className="size-8 rounded-full bg-gradient-to-br from-primary-200 to-primary-100 animate-pulse" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
