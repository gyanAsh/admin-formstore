import { HomeIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment, ReactElement } from "react";
import { Link } from "react-router";

export default function BreadCrumbs({
  otherPageLinks,
  currentPage,
}: {
  currentPage: string;
  otherPageLinks?: {
    path?: string;
    icons?: ReactElement;
    name: string;
  }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {otherPageLinks?.map((link, i) => {
          return (
            <Fragment key={i}>
              <BreadcrumbItem>
                <Link
                  data-slot="breadcrumb-link"
                  className="hover:text-foreground transition-colors"
                  to={link?.path || ""}
                >
                  {link.icons !== undefined ? (
                    <>
                      <HomeIcon size={16} aria-hidden="true" />
                      <span className="sr-only">Home</span>
                    </>
                  ) : (
                    link.name
                  )}
                </Link>
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
