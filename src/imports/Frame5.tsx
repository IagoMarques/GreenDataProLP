import React from "react";

/**
 * Feature Illustration Component
 * Displays a placeholder image for the feature section
 */
const FeatureIllustration = () => {
  return (
    <div 
      className="absolute 
                 bg-[#a8a8a8] 
                 h-[440px] 
                 left-[251.5px] 
                 rounded-[32px] 
                 top-[calc(50%+100.58px)] 
                 translate-y-[-50%] 
                 w-[777px]" 
    />
  );
};

/**
 * Feature Title Component
 */
const FeatureTitle = () => {
  return (
    <div className="absolute 
                    flex 
                    flex-col 
                    font-['Titillium_Web:Bold',sans-serif] 
                    justify-center 
                    leading-[0] 
                    left-1/2 
                    not-italic 
                    opacity-90 
                    text-[38px] 
                    text-black 
                    text-center 
                    top-[calc(50%-298.58px)] 
                    translate-x-[-50%] 
                    translate-y-[-50%] 
                    w-[669.145px]">
      <p className="leading-[1.17] whitespace-pre-wrap">
        Planejamento centralizado e reutilizável
      </p>
    </div>
  );
};

/**
 * Feature Description Component
 */
const FeatureDescription = () => {
  return (
    <p className="absolute 
                  font-['Titillium_Web:SemiBold',sans-serif] 
                  leading-[1.18] 
                  left-[640px] 
                  not-italic 
                  text-[20px] 
                  text-[rgba(0,0,0,0.5)] 
                  text-center 
                  top-[155px] 
                  translate-x-[-50%] 
                  w-[460.779px] 
                  whitespace-pre-wrap">
      <span>
        Projetos, localizações e pontos de monitoramento organizam a operação desde o início,{" "}
      </span>
      <span className="text-[rgba(0,0,0,0.98)]">
        sem cadastros repetidos
      </span>.
    </p>
  );
};

/**
 * Planning Feature Frame Component
 * Displays information about centralized and reusable planning
 */
export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <FeatureIllustration />
      <FeatureTitle />
      <FeatureDescription />
    </div>
  );
}