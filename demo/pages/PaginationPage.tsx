import React from "react";
import { Pagination } from "../../data-display/Pagination";
import { usePagination } from "../../hooks/usePagination/usePagination";
import { Button, Text } from "../../common";
import { Page, Section } from "../../layout";
import { useLocation } from "../../Router/hooks";

const BasicPagination: React.FC = () => {
  const pagination = usePagination({
    storageKey: "pg-demo",
    defaultPageSize: 10,
  });

  React.useEffect(() => {
    pagination.setTotalItems(100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Pagination pagination={pagination} />;
};
BasicPagination.displayName = "BasicPagination";

export const PaginationPage: React.FC = () => {
  const [, navigate] = useLocation();

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Pagination
        </Text>
        <Text color="secondary">
          A controlled pagination component. Wire it up with the{" "}
          <code>usePagination</code> hook — which handles URL persistence, Web
          Storage, and all derived state for you.
        </Text>
        <Button
          variant="primary"
          onClick={() => navigate("/hooks/use-pagination")}
        >
          See all usePagination examples →
        </Button>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Live Demo
        </Text>
        <Text color="secondary" size="sm">
          100 items, 10 per page. Page and page size are synced to the URL —
          reload the tab and you'll land on the same page.
        </Text>
        <div className="component-page__demo-column">
          <BasicPagination />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Props
        </Text>
        <pre className="code-block">
          <code>{`interface PaginationProps {
  pagination: PaginationState;  // return value of usePagination()
  showSizeSelector?: boolean;   // default: true
  pageSizeOptions?: number[];   // default: [10, 20, 50, 100]
  className?: string;
}`}</code>
        </pre>
        <Text as="p" size="sm" color="secondary">
          <code>PaginationState</code> is the object returned by{" "}
          <code>usePagination()</code>. For the full hook API and more examples,
          see the{" "}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/hooks/use-pagination")}
          >
            usePagination docs
          </Button>
          .
        </Text>
      </Section>
    </Page>
  );
};
