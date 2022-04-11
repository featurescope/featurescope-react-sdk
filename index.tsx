import { Features, JsonValue, init, Demographics } from "@featurescope/node-sdk"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export type FeaturesProviderProps = {
  apiKey: string | null
  apiUrl?: string
  children?: ReactNode
  defaultFeatures?: Features
  demographics?: Demographics
  featureIds?: Array<string>
  scope?: string
}

export const FeaturesContext = createContext<Features>({})

export const FeaturesProvider = ({
  apiKey = null,
  apiUrl,
  children,
  defaultFeatures = {},
  demographics = {},
  featureIds,
  scope = "_",
}: FeaturesProviderProps) => {
  const client = useMemo(() => init({ apiKey, apiUrl }), [apiKey, apiUrl])
  const [currentFeatures, setFeatures] = useState(defaultFeatures)

  useEffect(() => {
    client
      .findFeaturesListVariationsByDemographics(scope, featureIds, demographics)
      .then((features) => setFeatures({ ...currentFeatures, ...features }))
  }, [scope, demographics, featureIds])

  return (
    <FeaturesContext.Provider value={currentFeatures}>
      {children}
    </FeaturesContext.Provider>
  )
}

export const useFeature = (featureId: string): JsonValue => {
  const features = useContext(FeaturesContext)
  return features[featureId] ?? null
}

export const useFeatures = (featureIds?: Array<string>): JsonValue => {
  const features = useContext(FeaturesContext)

  if (Array.isArray(featureIds)) {
    const filteredFeatures: Features = {}

    for (const featureId in features) {
      if (features.hasOwnProperty(featureId)) {
        filteredFeatures[featureId] = features[featureId]
      }
    }

    return filteredFeatures
  }

  return features
}
