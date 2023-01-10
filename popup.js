const btn = document.querySelector(".chengecolorbtn");
const colorGrid = document.querySelector(".colorGrid");
const colorvalue = document.querySelector(".colorvalue");

btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickclor,
    },
    async (injectionResult) => {
      const [data] = injectionResult;

      if (data.result) {
        const color = data.result.sRGBHex;
        colorGrid.style.backgroundColor = color;
        colorvalue.innerText = color;
      }

      console.log(injectionResult);
    }
  );
});

async function pickclor() {
  try {
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
  } catch (error) {}
}
