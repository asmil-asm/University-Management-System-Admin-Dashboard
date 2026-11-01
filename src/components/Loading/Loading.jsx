import './Loading.css'
const Loading = () => {
    return(
        <>
    <div className="page-loader">
      <div className="page-loader-content">
        <div className="page-loader-spinner">
          <span className="page-loader-ring"></span>
          <span className="page-loader-ring-second"></span>
        </div>

        <h2 className="page-loader-title">
Dashboard Admin University
        </h2>

        <p className="page-loader-subtitle">
          Loading...
        </p>
      </div>
    </div>

        </>
    );
}
export default Loading;