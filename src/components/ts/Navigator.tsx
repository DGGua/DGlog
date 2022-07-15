import "../scss/Navigator.scss"
export interface NavigatorProps {
    tags: Array<{ name: string, url: string }>
}

export default function Navigator(props: NavigatorProps) {
    const { tags } = props
    return (
        <nav className="flex-row navigator-body">
            <span className="navigator-suffix">DGLog</span>
            {tags.map((tag, index) =>
                <>
                    {index !== 0 ? "|" : ""}
                    <a href={tag.url}>{tag.name}</a>
                </>
            )}
        </nav >
    )
}