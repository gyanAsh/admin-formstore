import { HomeIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment, ReactElement } from "react";
import { Link } from "react-router";

export default function BreadCrumbs({
  otherPageLinks = [
    {
      path: "/",
      name: "Home",
      icons: <HomeIcon size={16} aria-hidden="true" />,
    },
  ],
  currentPage = "Current-Page",
}: {
  currentPage: string;
  otherPageLinks: {
    path?: string;
    icons?: ReactElement;
    name: string;
  }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {otherPageLinks.map((link, i) => {
          return (
            <Fragment key={i}>
              <BreadcrumbItem>
                <BreadcrumbLink to={link?.path || ""}>
                  {link.icons !== undefined ? (
                    <>
                      <HomeIcon size={16} aria-hidden="true" />
                      <span className="sr-only">Home</span>
                    </>
                  ) : (
                      link.name
                    )}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator> / </BreadcrumbSeparator>
            </Fragment>
          );
        })}

        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
