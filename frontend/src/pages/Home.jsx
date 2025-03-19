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
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL || ''}/api/news`
        );
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="min-h-screen">
        <main className="max-w-4xl mx-auto">
          <section style={{ borderBottomRightRadius: "1.0rem", marginTop: "10vh" }} className="bg-white shadow-md p-6">
            <div>
              <p className="text-left text-gray-700 leading-relaxed space-y-4" id="blacktext">
              WP 5 objective is to support the exchange of knowledge and practical experience
among the community and future researchers as well as dissemination and
exploitation of the results.

It is primary addressed to MSc and PhD students, as main target group, but also
researchers and other members of the community.

As a keeper and provider of knowledge, WP5 will also host a “LFR simulation
tools initiative”, where on an open platform the partners will share simulation tools
for use and further development.
              </p>
            </div>
            <section className="mt-10">
              <h2 id="blacktext" className="text-2xl font-bold text-gray-800 mb-6">Latest News</h2>
              {Array.isArray(news) ? (
                news.map((article) => (
                  <div key={article.id} className="news-article" style={{ marginLeft: "12vw" }}>
                    <img
                      src={article.image_url}
                      alt={article.title}
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
                          __html: article.content.length > 200
                            ? `${article.content.substring(0, 200)}...`
                            : article.content,
                        }}
                      />
                      <Link to={`/news/${article.id}`}> read more</Link>
                      <p className="news-date">
                        {new Date(article.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No news available</p>
              )}
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;