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
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    if (news.length > 0) {
      const timer = setInterval(() => {
        setActiveIndex((current) => (current + 1) % news.length);
      }, 5000); // 5 seconds delay
  
      return () => clearInterval(timer);
    }
  }, [news.length]);

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
  <h2 id="blacktext" className="text-2xl font-bold text-gray-800 mb-6">
    Latest News
  </h2>
  {Array.isArray(news) && news.length > 0 ? (
    <div className="relative w-full h-[600px] overflow-hidden rounded-lg">
      {/* Image slider */}
      <div className="relative h-[400px] mb-4">
  {news.map((article, index) => (
    <div
      key={article.id}
      className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform ${
        index === activeIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      }`}
    >
      <Link to={`/news/${article.id}`} className="block w-full h-full">
        <img
          src={article.image_url || "https://res.cloudinary.com/djunroohl/image/upload/v1739826909/fcpw9zqxs0wwxnmrp62n.svg"}
          alt={article.title || "News image"}
          className="w-full h-full object-cover rounded-t-lg"
          style={{ minHeight: "400px" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://res.cloudinary.com/djunroohl/image/upload/v1739826909/fcpw9zqxs0wwxnmrp62n.svg";
          }}
        />
      </Link>
    </div>
  ))}
</div>

        <div id="news-box-home" className="bg-white p-6 rounded-lg shadow-lg">
          <h3
            className="text-xl font-bold mb-2"
            style={{ fontFamily: "Barlow, sans-serif" }}
          >
            {news[activeIndex].title}
          </h3>
          <Link
            style={{
          fontFamily: "Barlow, sans-serif",
          fontSize: "12px",
          lineHeight: "1.5",
          color: "#333",
            }}
            to={`/news/${news[activeIndex].id}`}
            className="text-black-600 hover:text-blue-800 transition-colors duration-200"
          >
            <div
          className="prose max-w-none mb-4"
          style={{ fontFamily: "Barlow, sans-serif" }}
          dangerouslySetInnerHTML={{
            __html:
              news[activeIndex].content?.length > 200
            ? `${news[activeIndex].content.substring(0, 200)}...`
            : news[activeIndex].content || "<p>Article content unavailable</p>",
          }}
            />
          </Link>
        </div>

        {/* Navigation dots */}
      <div id="dots" className="absolute bottom-24 left-0 right-0 flex justify-center space-x-2">
        {news.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-200 
              ${index === activeIndex ? "bg-blue-600" : "bg-gray-300"}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
              <div id="news-date" className="flex justify-between items-center">
                <p className="text-gray-500 text-sm">
                  {new Date(news[activeIndex].created_at).toLocaleDateString()}
                </p>
              </div>
    </div>
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