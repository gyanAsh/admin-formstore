import { Button } from "@/components/ui/button";

function SubmissionTable() {
  return (
    <div className="p-4">
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
    </div>
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
      <Button className="bg-primary px-4 py-1 dark:text-white font-bold uppercase">
        download csv
      </Button>

      <SubmissionTable />

      <Button className="bg-red-400 px-4 py-1 dark:text-white font-bold uppercase">
        close
      </Button>
    </div>
  );
}
