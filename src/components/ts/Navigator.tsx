import "../scss/Navigator.scss";
export interface NavigatorProps {
  tags: Array<{ name: string; url: string }>;
}

export default function Navigator(props: NavigatorProps) {
  const { tags } = props;
  return (
    <nav className="flex-row navigator-body">
      <a className="navigator-suffix" href="http://dggua.top">
        DGLog
      </a>
      {tags.map((tag, index) => (
        <>
          {index !== 0 ? "|" : ""}
          <a href={tag.url}>{tag.name}</a>
        </>
      ))}
    </nav>
  );
}
