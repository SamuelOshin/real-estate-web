"use client";

import { useState, useMemo, useCallback } from "react";
import type { Property } from "@/types/property";

export interface PropertyFilterState {
  search: string;
  corridor: string;
  titleStatus: string;
  sortBy: string;
  plotSizeTag: string;
  urgencies: string[];
  verifications: string[];
  topography: string;
  minPrice: string;
  maxPrice: string;
  amenities: string[];
  paymentTerms: string[];
}

const initialFilterState: PropertyFilterState = {
  search: "",
  corridor: "all",
  titleStatus: "any",
  sortBy: "featured",
  plotSizeTag: "all",
  urgencies: [],
  verifications: [],
  topography: "all",
  minPrice: "",
  maxPrice: "",
  amenities: [],
  paymentTerms: [],
};

export function usePropertyFilters(properties: Property[]) {
  const [filters, setFilters] = useState<PropertyFilterState>(initialFilterState);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const setCorridor = useCallback((corridor: string) => {
    setFilters((prev) => ({ ...prev, corridor }));
  }, []);

  const setTitleStatus = useCallback((titleStatus: string) => {
    setFilters((prev) => ({ ...prev, titleStatus }));
  }, []);

  const setSortBy = useCallback((sortBy: string) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const setPlotSizeTag = useCallback((plotSizeTag: string) => {
    setFilters((prev) => ({ ...prev, plotSizeTag }));
  }, []);

  const toggleUrgency = useCallback((urgency: string) => {
    setFilters((prev) => {
      const exists = prev.urgencies.includes(urgency);
      return {
        ...prev,
        urgencies: exists
          ? prev.urgencies.filter((item) => item !== urgency)
          : [...prev.urgencies, urgency],
      };
    });
  }, []);

  const toggleVerification = useCallback((verification: string) => {
    setFilters((prev) => {
      const exists = prev.verifications.includes(verification);
      return {
        ...prev,
        verifications: exists
          ? prev.verifications.filter((item) => item !== verification)
          : [...prev.verifications, verification],
      };
    });
  }, []);

  const setTopography = useCallback((topography: string) => {
    setFilters((prev) => ({ ...prev, topography }));
  }, []);

  const setMinPrice = useCallback((minPrice: string) => {
    setFilters((prev) => ({ ...prev, minPrice }));
  }, []);

  const setMaxPrice = useCallback((maxPrice: string) => {
    setFilters((prev) => ({ ...prev, maxPrice }));
  }, []);

  const toggleAmenity = useCallback((amenity: string) => {
    setFilters((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((item) => item !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  }, []);

  const togglePaymentTerm = useCallback((paymentTerm: string) => {
    setFilters((prev) => {
      const exists = prev.paymentTerms.includes(paymentTerm);
      return {
        ...prev,
        paymentTerms: exists
          ? prev.paymentTerms.filter((item) => item !== paymentTerm)
          : [...prev.paymentTerms, paymentTerm],
      };
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilterState);
  }, []);

  // Compute live verification counts from the data array
  const verificationCounts = useMemo(() => {
    return {
      "Governor's Consent": properties.filter((p) =>
        p.verification.label.toLowerCase().includes("governor")
      ).length,
      "Certificate of Occupancy": properties.filter((p) =>
        p.verification.label.toLowerCase().includes("occupancy")
      ).length,
      "Government Gazette": properties.filter((p) =>
        p.verification.label.toLowerCase().includes("gazette")
      ).length,
      "Registered Survey & Excision": properties.filter(
        (p) =>
          p.verification.label.toLowerCase().includes("survey") ||
          p.verification.label.toLowerCase().includes("excision")
      ).length,
    };
  }, [properties]);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((property) => {
        // Search query
        if (filters.search.trim()) {
          const query = filters.search.toLowerCase().trim();
          const matchesTitle = property.title.toLowerCase().includes(query);
          const matchesDesc = property.description.toLowerCase().includes(query);
          const matchesArea = property.location.area.toLowerCase().includes(query);
          const matchesBeacon = property.beaconId?.toLowerCase().includes(query) ?? false;
          if (!matchesTitle && !matchesDesc && !matchesArea && !matchesBeacon) {
            return false;
          }
        }

        // Corridor dropdown
        if (filters.corridor !== "all") {
          const corridor = filters.corridor.toLowerCase();
          const matchesCorridor = property.corridor === corridor;
          const matchesArea = property.location.area.toLowerCase().includes(corridor);
          if (!matchesCorridor && !matchesArea) {
            return false;
          }
        }

        // Title Status dropdown
        if (filters.titleStatus !== "any") {
          const label = property.verification.label.toLowerCase();
          if (filters.titleStatus === "consent" && !label.includes("governor")) return false;
          if (filters.titleStatus === "coo" && !label.includes("occupancy")) return false;
          if (filters.titleStatus === "gazette" && !label.includes("gazette")) return false;
          if (
            filters.titleStatus === "excision" &&
            !label.includes("survey") &&
            !label.includes("excision")
          ) {
            return false;
          }
        }

        // Plot size quick tags
        if (filters.plotSizeTag !== "all") {
          if (filters.plotSizeTag === "300" && property.plotSizeSqm !== 300) return false;
          if (filters.plotSizeTag === "500" && property.plotSizeSqm !== 500) return false;
          if (filters.plotSizeTag === "600" && property.plotSizeSqm !== 600) return false;
          if (filters.plotSizeTag === "1000" && property.plotSizeSqm < 1000) return false;
          if (filters.plotSizeTag === "acres" && (!property.plotSizeAcres || property.plotSizeAcres <= 0)) {
            return false;
          }
        }

        // Urgency checkboxes
        if (filters.urgencies.length > 0) {
          if (!property.allocationUrgency || !filters.urgencies.includes(property.allocationUrgency)) {
            return false;
          }
        }

        // Verification checkboxes
        if (filters.verifications.length > 0) {
          const matchesAnyVerification = filters.verifications.some((v) => {
            const vLower = v.toLowerCase();
            const pLower = property.verification.label.toLowerCase();
            if (vLower.includes("governor") && pLower.includes("governor")) return true;
            if (vLower.includes("occupancy") && pLower.includes("occupancy")) return true;
            if (vLower.includes("gazette") && pLower.includes("gazette")) return true;
            if (
              (vLower.includes("survey") || vLower.includes("excision")) &&
              (pLower.includes("survey") || pLower.includes("excision"))
            ) {
              return true;
            }
            return false;
          });
          if (!matchesAnyVerification) return false;
        }

        // Topography radio / choice
        if (filters.topography !== "all") {
          if (property.topography !== filters.topography) return false;
        }

        // Min price
        if (filters.minPrice) {
          const cleanMin = Number(filters.minPrice.replace(/[^0-9]/g, ""));
          if (!isNaN(cleanMin) && cleanMin > 0 && property.priceNgn < cleanMin) {
            return false;
          }
        }

        // Max price
        if (filters.maxPrice) {
          const cleanMax = Number(filters.maxPrice.replace(/[^0-9]/g, ""));
          if (!isNaN(cleanMax) && cleanMax > 0 && property.priceNgn > cleanMax) {
            return false;
          }
        }

        // Amenities
        if (filters.amenities.length > 0) {
          const hasAllSelectedAmenities = filters.amenities.every((amenity) =>
            property.amenities?.includes(amenity)
          );
          if (!hasAllSelectedAmenities) return false;
        }

        // Payment terms
        if (filters.paymentTerms.length > 0) {
          const hasSelectedPaymentTerm = filters.paymentTerms.some((term) =>
            property.paymentTerms?.includes(term)
          );
          if (!hasSelectedPaymentTerm) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price_asc") {
          return a.priceNgn - b.priceNgn;
        }
        if (filters.sortBy === "price_desc") {
          return b.priceNgn - a.priceNgn;
        }
        if (filters.sortBy === "roi") {
          return (b.projectedRoiPercent || 0) - (a.projectedRoiPercent || 0);
        }
        return 0; // "featured" keeps original array order
      });
  }, [properties, filters]);

  return {
    filters,
    filteredProperties,
    verificationCounts,
    setSearch,
    setCorridor,
    setTitleStatus,
    setSortBy,
    setPlotSizeTag,
    toggleUrgency,
    toggleVerification,
    setTopography,
    setMinPrice,
    setMaxPrice,
    toggleAmenity,
    togglePaymentTerm,
    resetFilters,
  };
}
