import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "@cds/core/button/register.js";
import "@cds/core/icon/register.js";
import "@cds/core/dropdown/register.js";
import "@cds/core/divider/register.js";
import "@webcomponents/custom-elements/custom-elements.min.js";
import "@clr/icons/clr-icons.min.css";
import "@clr/icons/shapes/technology-shapes.js";
import "../App.css";
import "./Home.css";

function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Always provide mock data for static deployment
        if (process.env.REACT_APP_API_MOCK === 'true') {
          // Return mock data when no backend is available
          setNews([
            {
              id: 1,
              title: "Lesto Project Website Launch",
              content: "<p>The Lesto project website is now online check back soon for more content and news</p>",
              image_url: "https://www.codelikethewind.org/content/images/size/w2000/2022/05/hello_world.png",
              created_at: new Date().toISOString()
            },
          ]);
          return;
        }
        
        // This won't execute in static deployment
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL || ''}/api/news`);
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
        // Fallback to mock data on error
        setNews([
          {
            id: 1,
            title: "Lesto Project Website Launch",
            content: "<p>The Lesto project website is now online check back soon for more content and news</p>",
            image_url: "https://www.codelikethewind.org/content/images/size/w2000/2022/05/hello_world.png",
            created_at: new Date().toISOString()
          }
        ]);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="min-h-screen">
        <main className="max-w-4xl mx-auto">
          <h1 class ="fade-in-left" 
         >Advancing lead fast reactor technology</h1>
          
          <section style={{ borderBottomRightRadius: "1.0rem", marginTop: "10vh" }} className="bg-white shadow-md p-6">
            <div>
              <p className="text-left text-gray-700 leading-relaxed space-y-4" id="blacktext">
              Lead Fast Reactors (LFRs) are a crucial technology for advancing both hydrogen energy and nuclear power solutions, offering a promising and ambitious approach. Investors are already drawn to the advantages of competitive small- to medium-sized LFRs and their potential impact on the global market. The EU-funded LESTO project aims to further develop this technology, advancing it along its established roadmap and demonstrating its safety, efficiency, and other key features. To achieve this, the project will leverage the most relevant facilities in Europe and the UK to thoroughly validate, assess, and assist in the continued development of LFR technology.
              </p>
            </div>
            <section className="mt-10">
              <h2 id="blacktext" className="text-2xl font-bold text-gray-800 mb-6">Latest News</h2>
              {Array.isArray(news) && news.length > 0 ? (
                news.map((article) => (
                  <div key={article.id} className="news-article">
                    <img
                      src={article.image_url || "https://res.cloudinary.com/djunroohl/image/upload/v1739826909/fcpw9zqxs0wwxnmrp62n.svg"}
                      alt={article.title || "News image"}
                      className="news-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://res.cloudinary.com/djunroohl/image/upload/v1739826909/fcpw9zqxs0wwxnmrp62n.svg";
                      }}
                    />
                    <div className="news-content">
                      <h3>{article.title}</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: article.content?.length > 200
                            ? `${article.content.substring(0, 200)}...`
                            : article.content || "<p>Article content unavailable</p>",
                        }}
                      />
                      <Link to={`/news/${article.id}`} className="read-more-link"> read more</Link>
                      <p className="news-date">
                        {new Date(article.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 italic">No news available</p>
              )}
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;