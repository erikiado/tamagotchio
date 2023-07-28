import Image from "next/image";


export const parseChatResponse = (answer: string) => {
  let clean = answer.split("\n\n");
  return clean;
}


export function sliderValueToVideoTime(duration: number, sliderValue: number) {
  return Math.round(duration * sliderValue / 100)
}