export default function CustomBreadcrumb({ activeItem, title }) {
  return (
    <div className="d-flex items-center justify-center gap-1 text-gray-600 text-sm breadcrumb">
      <span className="font-medium">{activeItem} {title}</span>
      <i class="material-icons-outlined font-medium">
        chevron_right
      </i>
      <i className="material-icons-outlined text-blue-500 text-lg">home</i>
      <i class="material-icons-outlined font-small ">
        chevron_right
      </i>
      <span className="font-small">{title}</span> 
      <i class="material-icons-outlined font-small ">
        chevron_right
      </i>
      <span className="font-small">{activeItem}</span> 
    </div>

  );
}
