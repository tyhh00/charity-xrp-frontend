interface ContainerProps {
    children: React.ReactNode;
  }
  
  const Container: React.FC<ContainerProps> = ({
    children
  }) => {
    return ( 
      <div className="mx-auto max-w-[90vw] md:max-w-[90vw] lg:max-w-[88vw] xl:max-w-[75vw]">
        {children}
      </div>
     );
  };
  
  export default Container;
  