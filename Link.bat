set tar_PJ=R:\MPI_Dev
set src_path=p:\MyKata\MSW\src
set tar_path=%tar_PJ%\Genesis_MVC\MSW
set tar_js=%tar_PJ%\Genesis_MVC\mockServiceWorker.js

mklink /J %tar_path%  %src_path%

del %tar_js% \Q
mklink %tar_js% p:\MyKata\MSW\mockServiceWorker.js 
pause