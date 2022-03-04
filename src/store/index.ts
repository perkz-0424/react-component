import createStores from "@/store/models";
import main from "@/store/main";
import pc from "@/store/pc";
import mobile from "@/store/mobile";
import image from "@/store/image";

const globalStore = createStores({
  main, pc, mobile, image
});
export default globalStore;
