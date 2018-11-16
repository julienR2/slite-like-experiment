package_chrome:
	cd .. && cp -rf slite-like-experiment slite-like-experiment-pkg
	cd ../slite-like-experiment-pkg && rm -rf Makefile && rm -rf .git && rm -rf **/.DS_Store
	cd ../slite-like-experiment-pkg && cp ~/Documents/Importants/keys/bookmarkExt.pem key.pem
	cd .. && zip -r -X bookmarkitExtChrome.zip slite-like-experiment-pkg && rm -rf slite-like-experiment-pkg

package_firefox:
	cd .. && cp -rf slite-like-experiment slite-like-experiment-pkg
	cd ../slite-like-experiment-pkg && rm -rf Makefile && rm -rf .git && rm -rf **/.DS_Store
	cd ../slite-like-experiment-pkg && zip -r -X ../bookmarkitExtFirefox.zip *
	cd .. && rm -rf slite-like-experiment-pkg
