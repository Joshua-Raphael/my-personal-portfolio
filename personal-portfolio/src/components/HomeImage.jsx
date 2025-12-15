import image from "../images/image.png";

const HomeImage = () => {
  return (
    <div className="home-img">
      <div className="img-box relative flex items-center justify-center overflow-hidden rounded-full w-[32vw] h-[32vw] p-[5px]">
        
        {/* rotating borders */}
        <span className="absolute w-[500px] h-[500px] animate-rotate-border 
          bg-[conic-gradient(transparent,transparent,transparent,#7cf03d)]"></span>

        <span className="absolute w-[500px] h-[500px] animate-rotate-border delay-[-5s]
          bg-[conic-gradient(transparent,transparent,transparent,#7cf03d)]"></span>

        {/* image container */}
        <div className="img-item relative z-10 flex items-center justify-center 
          w-full h-full rounded-full bg-[#1f242d] border border-[#1f242d] overflow-hidden">
          
          <img
            src={image}
            alt="Profile"
            className="absolute top-[30px] w-[85%] object-cover mix-blend-lighten"
          />
        </div>

      </div>
    </div>
  );
};

export default HomeImage;
