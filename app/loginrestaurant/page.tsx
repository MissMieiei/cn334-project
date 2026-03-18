export default function Page() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOP CREAM */}
      <div
        style={{
          height: "40vh",
          background: "#F0EEE9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            letterSpacing: "0.2em",
            color: "#444",
          }}
        >
          WELCOME
        </h1>
      </div>

      {/* BOTTOM RED */}
      <div
        style={{
          flex: 1,
          background: "#9F2436",
          borderTopLeftRadius: "60px",
          borderTopRightRadius: "60px",
          padding: "60px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "900px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* username */}
        <div style={{ marginBottom: 30 }}>
          <label style={{ color: "#eee", fontSize: 12 }}>
            USERNAME
          </label>

          <input
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #ddd",
              background: "transparent",
              color: "#fff",
              padding: "10px 0",
              outline: "none",
            }}
          />
        </div>

        {/* password */}
        <div style={{ marginBottom: 40 }}>
          <label style={{ color: "#eee", fontSize: 12 }}>
            PASSWORD
          </label>

          <input
            type="password"
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #ddd",
              background: "transparent",
              color: "#fff",
              padding: "10px 0",
              outline: "none",
            }}
          />
        </div>

        {/* button */}
        <button
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "40px",
            border: "none",
            background: "#F0EEE9",
            fontWeight: 600,
            letterSpacing: "0.1em",
          }}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}