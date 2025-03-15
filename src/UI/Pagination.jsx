import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null; // Hide pagination if there's only 1 page

  return (
    <div className="flex justify-center my-8">
      <nav className="bg-ybrown rounded-full px-4 py-2">
        <ul className="flex text-gray-600 gap-4 font-medium py-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={`rounded-full px-4 py-2 transition duration-300 ease-in-out ${
                  currentPage === page
                    ? "bg-orange text-darkblue font-semibold"
                    : "hover:bg-orange hover:text-darkblue"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
