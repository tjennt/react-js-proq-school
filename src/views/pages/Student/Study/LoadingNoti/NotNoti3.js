import React from "react";
// import imgNotFound from "../../../../../../assets/img/svg/insert-picture-icon.svg";
import ContentLoader from "react-content-loader";

const NotNoti3 = (props) => (
  <div>
    <ContentLoader
      speed={2}
      width={490}
      height={150}
      viewBox="0 0 490 150"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="25" y="15" rx="5" ry="5" width="380" height="90" />
      <rect x="25" y="115" rx="5" ry="5" width="380" height="40" />
    </ContentLoader>
  </div>
);

export default NotNoti3;
