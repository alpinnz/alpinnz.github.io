import * as React from "react";

type PortofolioItem = {
    title: string,
    descriptions: string,
    thumbnail?: string | undefined,
}

export function Portofolio(): React.ReactElement {
    const portofolioItems: PortofolioItem[] = [
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
                    <div className='font-bold text-2xl text-neutral-700'>Some Things I’ve Built</div>
                </div>
                <div className='m-1 sm:m-2 md:m-3'/>
                <div className="container">
                    <div className="-m-1 flex flex-wrap md:-m-2">
                        {portofolioItems.map((item, index) => (
                            <Card data={item} key={index}/>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

type CardProps = {
    data: PortofolioItem,
}

function Card(props: CardProps): React.ReactElement {
    return (
        <>
            <div className="p-1 md:p-2 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
                <div className="group bg-gray-100 rounded-lg overflow-hidden shadow-lg flex w-full">
                    <div style={{
                        display: "block",
                        position: "relative",
                        backgroundImage: "url(https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/gray-background-7131-98db5e6ffc4972baa4087760291cbc3e@1x.jpg)",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                         className="relative w-full h-32 md:h-48"
                    >
                        <div className="bg-neutral-50/5 backdrop-contrast-50 invisible group-hover:visible flex items-center justify-center h-full">
                            <h2 className="text-neutral-800">{props.data.title}</h2>
                        </div>
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
