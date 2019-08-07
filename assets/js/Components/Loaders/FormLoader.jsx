import React from "react";
import ContentLoader from "react-content-loader";

const FormLoader = props => (
    <ContentLoader
        height={200}
        width={450}
        speed={3}
        primaryColor="#C4D5EB"
        secondaryColor="#ecebeb"
        {...props}
    >
        <rect x="10" y="10" rx="6" ry="6" width="110" height="9" />
        <rect x="10" y="35" rx="6" ry="6" width="195" height="25" />
        <rect x="260" y="10" rx="6" ry="6" width="110" height="9" />
        <rect x="260" y="35" rx="6" ry="6" width="195" height="25" />
        <rect x="10" y="76" rx="6" ry="6" width="114" height="9" />
        <rect x="10" y="99" rx="6" ry="6" width="200" height="25" />
        <rect x="260" y="79" rx="6" ry="6" width="109" height="9" />
        <rect x="262" y="99" rx="6" ry="6" width="188" height="25" />
        <rect x="10" y="139" rx="1" ry="1" width="250" height="100" />
        <rect x="370" y="180" rx="6" ry="6" width="76" height="21" />
    </ContentLoader>
);

export default FormLoader;
