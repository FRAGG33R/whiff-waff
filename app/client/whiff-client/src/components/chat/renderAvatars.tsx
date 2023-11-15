export const RenderAvatars = (props : { avatars : string[]}) => {
	const { avatars } = props;

    if (avatars.length === 1) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <img
            alt="user avatar"
            className="w-6 md:w-10 h-6 md:h-10 rounded-[6px]  md:rounded-[12px]  "
            src={avatars[0]}
          />
        </div>
      );
    } else
    if (avatars.length === 2) {
      return (
        <div className="flex flex-col w-10 h-10 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 -space-x-1 -space-y-2">
          <div className="w-[55%] h-[55%] flex rounded-[6px] md:rounded-[12px]   ">
            <img
              alt="user avatar"
              className="w-full h-full  rounded-[6px] md:rounded-[12px]   "
              src={avatars[0]}
            />
          </div>
          <div className="w-full h-[55%]  rounded-[6px]  md:rounded-[12px]   flex justify-end items-end">
            <img
              alt="user avatar"
              className="w-[55%] h-full rounded-[6px] md:rounded-[12px] "
              src={avatars[1]}
            />
          </div>
        </div>
      );
    } else if (avatars.length === 3) {
      return (
        <div className="flex flex-col w-10 h-10 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 -space-y-2">
          <div className="w-full h-[55%] flex rounded-[6px] md:rounded-[12px]  -space-x-1">
            <img
              alt="user avatar"
              className="w-[50%] h-full rounded-[6px] md:rounded-[12px] "
              src={avatars[0]}
            />
            <img
              alt="user avatar"
              className="w-[50%] h-full rounded-[6px] md:rounded-[12px] "
              src={avatars[1]}
            />
          </div>
          <div className="w-full h-[55%] rounded-[6px] md:rounded-[12px]  flex justify-center items-center">
            <img
              alt="user avatar"
              className="w-[55%] h-full rounded-[6px] md:rounded-[12px] "
              src={avatars[2]}
            />
          </div>
        </div>);
    } else if (avatars.length >= 4) {
      return (
        <div className="flex flex-col w-10 h-10 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20  ">
          <div className="w-full h-[50%] flex rounded-[6px] md:rounded-[12px]    ">
            <img
              alt="user avatar"
              className="w-[50%] h-full rounded-[6px] md:rounded-[12px]   "
              src={avatars[0]}
            />
            <img
              alt="user avatar"
              className="w-[50%] h-full rounded-[6px] md:rounded-[12px]   "
              src={avatars[1]}
            />
          </div>
          <div className="w-full h-[50%] rounded-[6px] md:rounded-[12px]  flex ">
            <img
              alt="user avatar"
              className="w-[50%] h-full rounded-[6px] md:rounded-[12px] "
              src={avatars[2]}
            />
            {avatars.length === 4 ? (
              <img
              alt="user avatar"
              className="w-[50%] h-full rounded-[6px] md:rounded-[12px] "
              src={avatars[3]}
            />
            ) : (
              <span className="w-[50%] h-full rounded-[6px] md:rounded-[12px]  bg-DeepRose font-teko flex items-center justify-center">
                {avatars.length}
              </span>
            )}
          </div>
        </div>
      );
    }
  
    return null;
  };