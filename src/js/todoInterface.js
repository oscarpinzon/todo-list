const renderBaseHTML = () => {
  // Show date
  const options = { weekday: "long", month: "short", day: "numeric" };
  const today = new Date();
  const todayString = today.toLocaleDateString("en-US", options);
  const baseHTML = `
    <div class="container">
        <div class="header">
            <div class="clear">
                <i class="fa fa-refresh" aria-hidden="true"></i> 
            </div>
            <div id="date">${todayString}</div>
        </div>
        <div class="content">
            <ul id="list"></ul>
        </div>
        <div class="add-to-do">
            <i class="fas fa-plus-circle" aria-hidden="true"></i>
            <input type="text" id="input" placeholder="Add a to-do"></input>
        </div>
    </div>
    `;
  const position = "afterbegin";
  document.body.insertAdjacentHTML(position, baseHTML);
};

export { renderBaseHTML };
