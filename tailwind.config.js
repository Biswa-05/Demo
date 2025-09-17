module.exports = {
  theme: {
    extend: {
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "gradient-x": "gradient-x 10s ease infinite",
      },
      colors: {
        saffron: "#FF9933",
        deeporange: "#FF5722",
        gold: "#FFD700",
      },
    },
  },
}
