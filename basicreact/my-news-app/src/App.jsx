import React from "react";
import News from "./components/News";

function App() {
  return (
    <>
      <div style={styles.container}>
        <News
          title="Annual Planting"
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, velit laudantium, impedit atque voluptates culpa dolor ipsum doloremque possimus, natus animi? Illo sint corrupti ex voluptatum aperiam aut porro eveniet!
Accusamus sed voluptatum ratione quo esse ullam! Quidem voluptates ad dolor quas, culpa eaque nulla dignissimos ipsam omnis a eos, "
          image={"https://picsum.photos/id/239/300/300"}
          isFeatured={true}
          tags={["plant", "nature"]}
          bookmark={() => alert("Bookmarked")}
          style={styles.newsCard}
        />
      </div>
    </>
  );
}
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 500,
  },
  newsCard: {
    width: 300,
    border: "1px solid black",
    padding: 16,
    borderRadius: 18,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
};
export default App;
