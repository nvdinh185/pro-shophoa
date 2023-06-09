var currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);
if (currentUser) {

    var form = document.forms['add-form'];

    (async () => {
        try {
            var listHoaType = await axios({
                method: "GET",
                url: "http://localhost:3000/hoa/type",
                headers: { Authorization: `Bearer ${currentUser.token}` },
            });
            listHoaType = listHoaType.data;

            var selectElement = form.querySelector('select[name="loaihoa"]');
            selectElement.innerHTML = `<option value=''>-- Chọn loại hoa --</option>`;

            for (const type of listHoaType) {
                var optionElement = document.createElement('option');
                optionElement.value = type.type_id;
                optionElement.innerText = type.type_name;

                selectElement.appendChild(optionElement);
            }
        } catch (error) {
            console.log('Lỗi: ' + error);
            var errorElement = document.getElementById('error');
            errorElement.innerText = 'Xảy ra lỗi!';
            Object.assign(errorElement.style, {
                display: 'block',
                color: 'red',
                fontStyle: 'italic',
                fontWeight: 'bold',
                backgroundColor: 'yellow'
            })
        }
    })()

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if ($('#add-form').valid()) {
            const formData = new FormData();
            for (const el of e.target) {
                if (el.files) {
                    formData.append("file", el.files[0]);
                } else if (el.value) {
                    formData.append(el.name, el.value);
                }
            }
            try {
                var results = await axios({
                    method: "POST",
                    url: "http://localhost:3000/hoa/add",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                });

                //handle success
                console.log('results: ', results);
                location = 'list.html';
            } catch (error) {
                var errorElement = document.getElementById('error');
                errorElement.innerText = 'Xảy ra lỗi!';
                Object.assign(errorElement.style, {
                    display: 'block',
                    color: 'red',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    backgroundColor: 'yellow'
                })
            }
        }
    })

} else {
    // Nếu chưa login thì chuyển hướng sang trang login.html
    location = 'login.html';
}