import React from "react";
import ContentLoader from "react-content-loader";

/*const TableRow = props => {*/
const TableLoader = props => {
    //const random = Math.random() * (1 - 0.7) + 0.7;
    return (
        <ContentLoader
            height={200}
            width={450}
            speed={3}
            primaryColor="#E8F2FF"
            secondaryColor="#ecebeb"
            {...props}
        >
            <rect x="18" y="12" rx="4" ry="4" width="419" height="20" />
            <rect x="18" y="60" rx="6" ry="6" width="110" height="11" />
            <rect x="145" y="60" rx="6" ry="6" width="85" height="11" />
            <rect x="245" y="60" rx="6" ry="6" width="85" height="11" />
            <rect x="350" y="60" rx="6" ry="6" width="85" height="11" />
            <rect x="18" y="80" rx="6" ry="6" width="110" height="11" />
            <rect x="145" y="80" rx="6" ry="6" width="85" height="11" />
            <rect x="245" y="80" rx="6" ry="6" width="85" height="11" />
            <rect x="350" y="80" rx="6" ry="6" width="85" height="11" />
            <rect x="18" y="100" rx="6" ry="6" width="110" height="11" />
            <rect x="145" y="100" rx="6" ry="6" width="85" height="11" />
            <rect x="245" y="100" rx="6" ry="6" width="85" height="11" />
            <rect x="350" y="100" rx="6" ry="6" width="85" height="11" />
            <rect x="18" y="120" rx="6" ry="6" width="110" height="11" />
            <rect x="145" y="120" rx="6" ry="6" width="85" height="11" />
            <rect x="245" y="120" rx="6" ry="6" width="85" height="11" />
            <rect x="350" y="120" rx="6" ry="6" width="85" height="11" />
            <rect x="18" y="140" rx="6" ry="6" width="110" height="11" />
            <rect x="145" y="140" rx="6" ry="6" width="85" height="11" />
            <rect x="245" y="140" rx="6" ry="6" width="85" height="11" />
            <rect x="350" y="140" rx="6" ry="6" width="85" height="11" />
        </ContentLoader>
    );
};

export default TableLoader;
