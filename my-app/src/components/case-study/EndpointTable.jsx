import Reveal from "../Reveal";

const columns = ["Method", "Path", "Purpose", "Auth"];

function EndpointTable({ endpoints }) {
  return (
    <Reveal>
      <div className="card overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[38rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-5 py-3.5 text-xs font-semibold tracking-wider text-muted uppercase"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {endpoints.map((endpoint) => (
              <tr
                key={`${endpoint.method} ${endpoint.path}`}
                className="border-t border-line"
              >
                <td className="px-5 py-2.5 font-mono text-[0.7rem] font-semibold text-accent">
                  {endpoint.method}
                </td>
                <td className="px-5 py-2.5 font-mono text-xs whitespace-nowrap">
                  {endpoint.path}
                </td>
                <td className="px-5 py-2.5 text-muted">{endpoint.purpose}</td>
                <td className="px-5 py-2.5 text-xs text-muted">
                  {endpoint.access ?? (endpoint.auth ? "JWT" : "public")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

export default EndpointTable;
