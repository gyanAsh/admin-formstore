function SubmissionTable() {
  return (
      <table>
        <thead>
          <tr>
            <th>date</th> 
            <th>user reference id</th> 
            <th>email</th> 
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jan 21th 2025</td>
            <td>asteusatoeusatoesut</td>
            <td>rob@pikemail.com</td>
          </tr>
          <tr>
            <td>Jan 21th 2025</td>
            <td>saeustesoatseaos</td>
            <td>bob@littlemail.com</td>
          </tr>
        </tbody>
      </table>
  );
}

export default function AnalyticsPage() {
  return (
    <div>
      <div>
        <h1 className="text-xl font-bold">
          Survey of tool and technologies used in the working on small
          organizations
        </h1>
        <div>Jan 20th 2025</div>
        <div>total sumbission count: 1245</div>
      </div>
      <button className="bg-primary rounded-xl px-4 py-1">download csv</button>

      <SubmissionTable />
      <button className="bg-red-400 rounded-xl px-4 py-1">close form</button>
    </div>
  );
}
