import Link from "next/link";

interface Props {
  currentPage: string;
  previousPages?: { text: string; url: string }[];
}
const Breadcrumb = ({ currentPage, previousPages }: Props) => {
  return (
    <div className="flex gap-1">
      {previousPages &&
        previousPages.map((page) => (
          <div className="flex gap-1">
            <Link className="underline text-gray-500" href={page.url}>
              {page.text}
            </Link>
            <p>/</p>
          </div>
        ))}
      <p>{currentPage}</p>
    </div>
  );
};

export default Breadcrumb;
