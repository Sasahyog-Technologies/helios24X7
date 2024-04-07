const FloatingButton = () => {
  return (
    <div>
      <div className="settings-icon">
        <span
          data-bs-toggle="offcanvas"
          data-bs-target="#theme-settings-offcanvas"
          aria-controls="theme-settings-offcanvas"
        >
          <i className="la la-whatsapp" />
        </span>
      </div>
    </div>
  );
};

export default FloatingButton;
