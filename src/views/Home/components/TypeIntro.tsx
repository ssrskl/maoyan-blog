import { TypeAnimation } from "react-type-animation";
export const TypeIntro = () => {
  return (
    <TypeAnimation
      className="text-2xl tracking-widest"
      sequence={[
        "全栈大数据开发工程师", // Types 'One'
        1000, // Waits 1s
        "Full stack big data development engineer", // Deletes 'One'
        1000, // Waits 1s
      ]}
      speed={50}
      repeat={Infinity}
      cursor={true}
    />
  );
};
