/**
 * @file 通过hook实现响应式设计（屏幕长宽实时改变）
 * @version v1.0
 */
import React from "react";

const viewSizeContext = React.createContext({});

//将viewportContext.Provider封装成第三方组件，管理屏幕宽度高度
//并通过context与其他组件共享width和height“状态”
//别忘了组件名首字母大写
export const ViewSizeProvider = ({ children }) => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    React.useEffect(() => {
        //组件挂载时
        window.addEventListener("resize", handleWindowResize);
        //组件卸载前
        return () => {
            // console.log("remove");
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []); //带一个空参数，这样的useEffect相当于componentDidMount

    return (
        <viewSizeContext.Provider value={{ width, height }}>
            {children}
        </viewSizeContext.Provider>
    );
};

//自定义Hook，作为和width,height两个状态绑定的“行为”，它通过context接收新封装的provider中的数据
export const useViewSize = () => {
    // const context = React.useContext(viewSizeContext);
    const { width } = React.useContext(viewSizeContext);
    const breakpoint = 600;
    const isMobile = width > breakpoint ? false : true;
    return { width, isMobile };
}

