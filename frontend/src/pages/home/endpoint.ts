import { PreinitializedWritableAtom } from "nanostores";

const endpoint_home = {
  getJsonData: {
    key: "get-json-data",
    func: async (store: PreinitializedWritableAtom<any>) => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const data = await res.json();
      if (store) store.set(data);
      return data;
    },
  },
};

export default endpoint_home;
