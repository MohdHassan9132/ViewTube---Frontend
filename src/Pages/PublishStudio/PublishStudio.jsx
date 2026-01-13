import PublishVideoForm from "../../components/Video/PublishVideoForm";
import "../PublishStudio/Publish.css";

function PublishStudio() {
  return (
    <div className="studio-page">
      <h1 className="studio-title">Upload a New Video</h1>

      <div className="studio-content">
        <PublishVideoForm />
      </div>
    </div>
  );
}

export default PublishStudio;
