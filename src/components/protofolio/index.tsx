import React, {createRef, useState} from "react";

type PotofolioItem = {
    title: string,
    descriptions: string,
    thumbnail?: string | undefined,
}

export default function Potofolio(): React.ReactElement {
    const potofolioItems: PotofolioItem[] = [
        {
            title: 'Protofolio 1',
            descriptions: 'Protofolio 1 description',
        },
        {
            title: 'Protofolio 2',
            descriptions: 'Protofolio 2 description',
        },
        {
            title: 'Protofolio 3',
            descriptions: 'Protofolio 3 description',
        },
        {
            title: 'Protofolio 4',
            descriptions: 'Protofolio 4 description',
        },
        {
            title: 'Protofolio 5',
            descriptions: 'Protofolio 5 description',
        },
        {
            title: 'Protofolio 6',
            descriptions: 'Protofolio 6 description',
        }
    ];

    return (
        <>
            <section id="portofolio" className='mt-16 px-8 md:px-20 py-4 lg:px-24'>
                <div className='flex flex-row justify-center'>
                    <div className='font-bold text-2xl text-595260'>Some Things I’ve Built</div>
                </div>
                <div className='m-1 sm:m-2 md:m-3'/>
                <div className="container">
                    <div className="-m-1 flex flex-wrap md:-m-2">
                        {potofolioItems.map((item, index) => (
                            <Card data={item} key={index}/>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

type CardProps = {
    data: PotofolioItem,
}

function Card(props: CardProps): React.ReactElement {
    const [isHovering, setIsHovering] = useState(false);

    const dimensions = useViewport()

    const width: number = dimensions.width - (dimensions.width * 0.15);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };
    return (
        <>
            <div className="flex flex-col items-center p-1 md:p-2 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6"
                 onMouseOver={handleMouseOver}
                 onMouseOut={handleMouseOut}>
                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg flex w-full">
                    <div style={{
                        display: "block",
                        position: "relative",
                        backgroundImage: "url(https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/gray-background-7131-98db5e6ffc4972baa4087760291cbc3e@1x.jpg)",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                         className="relative w-full h-32 md:h-48"
                    >
                        {isHovering && (
                            <div className='absolute w-full h-full'>
                                <div className='h-full flex rounded-full justify-center justify-items-center align-middle'>
                                    <h2>{props.data.title}</h2>
                                </div>
                            </div>
                        )}
                    </div>
                    {/*<img*/}
                    {/*    alt={props.data.title}*/}
                    {/*    className="block h-auto w-full"*/}
                    {/*    src={props.data.thumbnail ?? "https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"}*/}
                    {/*>*/}
                    {/*</img>*/}


                    {/*<div className="p-4">*/}
                    {/*    <p className="text-2xl font-medium text-gray-900">{item.title}</p>*/}
                    {/*    <p className="text-gray-600">{item.descriptions}</p>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    );
}

const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    // Add a second state variable "height" and default it to the current window height
    const [height, setHeight] = React.useState(window.innerHeight);

    React.useEffect(() => {
        const handleWindowResize = () => {
            setWidth(window.innerWidth);
            // Set the height in state as well as the width
            setHeight(window.innerHeight);
        }

        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    // Return both the height and width
    return {width, height};
}