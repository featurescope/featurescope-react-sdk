import { Features, JsonValue, init } from "@featurescope/node-sdk"
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
  children?: ReactNode
  defaultFeatures?: Features
  demographics?: Record<string, string>
  featureIds?: Array<string>
  scope?: string
}

export const FeaturesContext = createContext<Features>({})

export const FeaturesProvider = ({
  apiKey = null,
  children,
  defaultFeatures = {},
  demographics = {},
  featureIds,
  scope = "_",
}: FeaturesProviderProps) => {
  const client = useMemo(() => init({ apiKey }), [apiKey])
  const [features, setFeatures] = useState(defaultFeatures)

  useEffect(() => {
    client
      .findFeaturesListVariationsByDemographics(scope, featureIds, demographics)
      .then(setFeatures)
  }, [scope, demographics, featureIds])

  return (
    <FeaturesContext.Provider value={features}>
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
