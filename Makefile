package_chrome:
	cd .. && cp -rf slite-like-experiment slite-like-experiment-pkg
	cd ../slite-like-experiment-pkg && rm -rf Makefile && rm -rf .git && rm -rf **/.DS_Store
	cd ../slite-like-experiment-pkg && cp ../slite-like-experiment.pem key.pem
	cd .. && zip -r -X sliteLikeExperimentChrome.zip slite-like-experiment-pkg && rm -rf slite-like-experiment-pkg

package_firefox:
	cd .. && cp -rf slite-like-experiment slite-like-experiment-pkg
	cd ../slite-like-experiment-pkg && rm -rf Makefile && rm -rf .git && rm -rf **/.DS_Store
	cd ../slite-like-experiment-pkg && zip -r -X ../bookmarkitExtFirefox.zip *
	cd .. && rm -rf slite-like-experiment-pkg
