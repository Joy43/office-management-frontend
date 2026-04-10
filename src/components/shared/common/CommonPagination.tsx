import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const CommonPagination = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-4 gap-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Show</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(val) => onPageSizeChange(Number(val))}
        >
          <SelectTrigger className="w-[70px] h-8 font-bold bg-slate-50/50">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {[5, 10, 20, 50].map((size) => (
              <SelectItem
                key={size}
                value={size.toString()}
                className="cursor-pointer"
              >
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>entries</span>
      </div>

      <Pagination className="justify-end w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  isActive={currentPage === pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={
                    currentPage === pageNum
                      ? "bg-[#8A2BE2] text-white"
                      : "cursor-pointer"
                  }
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                currentPage < totalPages && onPageChange(currentPage + 1)
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CommonPagination;
