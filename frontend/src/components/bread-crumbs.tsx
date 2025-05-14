import { ChevronRight, HomeIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment, ReactElement } from "react";
import { Link, useNavigate } from "react-router";
import * as motion from "motion/react-client";

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
  const navigate = useNavigate();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {otherPageLinks?.map((link, i) => {
          return (
            <Fragment key={i}>
              <BreadcrumbItem>
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    transition: {
                      type: "spring",
                      duration: 0.7,
                      bounce: 0.5,
                    },
                  }}
                  data-slot="breadcrumb-link"
                  className="hover:text-foreground transition-colors hover:bg-primary/25 px-2 py-1 rounded-md"
                  onClick={() => navigate(link?.path || "")}
                >
                  {link.icons !== undefined ? (
                    <>
                      <HomeIcon size={16} aria-hidden="true" />
                      <span className="sr-only">Home</span>
                    </>
                  ) : (
                    link.name
                  )}
                </motion.button>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="size-3.5" />
              </BreadcrumbSeparator>
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
