import { useEffect, useState, useMemo } from "react";
import { getResources } from "../services/api";
import MathBackground from "../components/MathBackground";
import Navbar from "../components/Navbar";
import "../styles/Resources.css";

interface Resource {
  id: number;
  subject: string;
  chapterName: string;
  pdfUrl: string;
}

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  // ✅ New state for the PDF preview modal
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    getResources()
      .then((res) => setResources(res.data))
      .catch((err) => console.error("Failed to fetch resources", err))
      .finally(() => setLoading(false));
  }, []);

  const topics = useMemo(() => {
    const allTopics = resources.map((r) => r.subject);
    return ["All", ...new Set(allTopics)].filter(Boolean);
  }, [resources]);

  const filteredResources = useMemo(() => {
    if (selectedTopic === "All") return resources;
    return resources.filter((r) => r.subject === selectedTopic);
  }, [resources, selectedTopic]);

  return (
    <div className="resources-container">
      <Navbar />
      <MathBackground showSymbols={false} />
      
      {/* Header Section */}
      <section className="resources-hero">
        <div className="hero-content">
          <h1 className="hero-title">Learning Resources</h1>
          <p className="hero-subtitle">Curated materials to boost your mathematical journey</p>
        </div>
      </section>

      {/* Main Content Wrapper */}
      <div className="resources-wrapper">
        {/* Sidebar */}
        <aside className="resources-sidebar">
          <div className="sidebar-header"><h2>Categories</h2></div>
          <ul className="subject-list">
            {topics.map((topic) => (
              <li key={topic} className="subject-item">
                <button
                  className={`subject-btn ${selectedTopic === topic ? "active" : ""}`}
                  onClick={() => setSelectedTopic(topic)}
                >
                  {topic}
                  <span className="subject-count">
                    {topic === "All" ? resources.length : resources.filter(r => r.subject === topic).length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="resources-main">{loading ? (
          <div className="loading-spinner">Loading resources...</div>
        ) : (
          <div className="resources-grid">
            {filteredResources.map((r) => (
              <div key={r.id} className="resource-card">
                <div className="resource-icon">📚</div>
                <div className="resource-subject">{r.subject}</div>
                <h3 className="resource-title">{r.chapterName}</h3>

                <div className="resource-actions">
                  {/* ✅ PREVIEW BUTTON */}
                  <button
                    onClick={() => setPreviewUrl(r.pdfUrl)}
                    className="preview-btn"
                  >
                    View Online 👁️
                  </button>

                  {/* Download Link */}
                  <a href={r.pdfUrl} download className="download-link">
                    Download ↗
                  </a>
                </div>
              </div>
            ))}

            {filteredResources.length === 0 && (
              <div className="no-results">No resources found.</div>
            )}
          </div>
        )}

        {/* ✅ PDF MODAL OVERLAY */}
        {previewUrl && (
          <div className="pdf-modal-overlay" onClick={() => setPreviewUrl(null)}>
            <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Document Preview</h3>
                <button className="close-modal" onClick={() => setPreviewUrl(null)}>×</button>
              </div>
              <iframe
                src={`${previewUrl}#toolbar=0`}
                width="100%"
                height="100%"
                title="PDF Preview"
              />
            </div>
          </div>
        )}
      </main>
      </div>
    </div>
  );
};

export default Resources;