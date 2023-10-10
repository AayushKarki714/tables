import P from "rc-pagination";

export default function Pagination({ current, ...otherProps }) {
  return (
    <P
      className="flex px-6 py-3 gap-x-4 "
      showPrevNextJumpers={false}
      hideOnSinglePage
      current={current}
      itemRender={(currPage, type) => {
        let additionalClassName =
          currPage === current ? " bg-green-800 text-white" : "";
        return type === "page" ? (
          <button
            className={"flex items-center justify-center w-8 h-8 p-3 rounded-full hover:text-white hover:bg-green-800".concat(
              additionalClassName
            )}
          >
            {currPage}
          </button>
        ) : null;
      }}
      {...otherProps}
    />
  );
}
