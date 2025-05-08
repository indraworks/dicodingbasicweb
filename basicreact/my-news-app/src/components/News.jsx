import React from "react";
import PropTypes from "prop-types";

const News = ({
  title,
  description,
  image,
  isFeatured,
  tags,
  bookmark,
  style,
}) => {
  return (
    <article style={style}>
      <img src={image} alt={title} />
      {isFeatured && (
        <p>
          <strong>Hot News</strong>
        </p>
      )}
      <p>{title}</p>
      <p>{description}</p>
      <br />
      <p>{tags.map((tag) => `#${tag}`)}</p>
    </article>
  );
};

News.PropTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isFeatured: PropTypes.bool,
  //ini masuk array tapi karena 1 type saja string saja pakau arrayOf
  tags: PropTypes.arrayOf(PropTypes.string),
  bookmark: PropTypes.func,
  style: PropTypes.object,
};
export default News;
/*
proptypes utk filter supaay agar param yg masuk tidak salah type data 
sudah diatasi 

*/

/*
article adalah tag html yg berdiri sendiri ,yg mana utk content dia adalah sama mirip 
dgn articel tapi content adalah 
Tag article dalam HTML digunakan untuk mewakili konten yang berdiri sendiri dan dapat dipahami secara terpisah, seperti artikel berita, posting blog, atau komentar. Tag ini sering digunakan untuk memformat konten yang bisa didistribusikan 
atau digunakan kembali secara independen. 
articel dgn section bedanya apa?
Perbedaan dengan section:
Tag section digunakan untuk membagi halaman menjadi bagian-bagian yang lebih besar, 
sementara article digunakan untuk memformat konten independen di dalam bagian tersebut. 
biasanya <section > articell
                   article
         </section>          

*/
