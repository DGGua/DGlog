import "../scss/Table.scss";
interface TableProps {
  data?: Record<string, string>;
}
export default function Table(props: TableProps) {
  const { data = {} } = props;
  return (
    <table>
      {Object.keys(data).map((key) => (
        <tr>
          <td>{key}</td>
          <td>{data[key]}</td>
        </tr>
      ))}
    </table>
  );
}
