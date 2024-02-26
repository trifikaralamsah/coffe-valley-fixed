export const getData = async (url: string) => {
  // const res = await fetch("https://fakestoreapi.com/products", {
  //   cache: "no-store",
  // });

  // no cache
  // const res = await fetch("http://localhost:3000/api/product", {
  //   cache: "no-store",
  // });

  // cache with revalidate time based
  // const res = await fetch("http://localhost:3000/api/product", {
  //   cache: "force-cache", // default cache nextjs
  //   next: {
  //     revalidate: 10,
  //   },
  // });

  // cache with revalidate on-demand based
  const res = await fetch(url, {
    cache: "force-cache", // default cache nextjs
    next: {
      tags: ["products"],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data fake api");
  }

  return res.json();
};

// useSwr
export const fetcher = (url: string) => fetch(url).then((res) => res.json());
