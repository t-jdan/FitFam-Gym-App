export const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="flex justify-center space-x-2 mt-4">
                {pageNumbers.map(number => (
                    <li key={number} className={`px-3 py-2 rounded-lg ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        <a onClick={() => paginate(number)} href="!#">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
