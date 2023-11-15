export default function HexaGon(props: { avatar: string }) {
  return (
    <div className="mask mask-hexagon-2 flex items-center justify-center bg-DeepRose w-[280px] lg:w-[480px] h-32 lg:h-48 rotate-90">
      <div className="mask mask-hexagon-2 w-[92%] h-[92%] bg-white text-black flex items-center justify-center">
        <img
          alt="profile picture"
          className="bg-DeepRose w-[130px] lg:w-[200px] -rotate-90"
          src={props.avatar}
        />
      </div>
    </div>
  );
}
